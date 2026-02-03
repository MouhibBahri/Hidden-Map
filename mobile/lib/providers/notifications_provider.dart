import 'dart:async';
import 'package:flutter/foundation.dart';
import '../services/notification_service.dart';

class NotificationsProvider with ChangeNotifier {
  Timer? _pollTimer;
  String? _token;
  bool _isAuthenticated = false;
  int _unreadCount = 0;

  int get unreadCount => _unreadCount;

  void setToken(String? token, bool isAuthenticated) {
    _token = token;
    _isAuthenticated = isAuthenticated;

    // Cancel existing timer
    _pollTimer?.cancel();

    if (isAuthenticated && token != null) {
      // Start polling immediately and then every 30 seconds
      _loadNotifications();
      _pollTimer = Timer.periodic(const Duration(seconds: 30), (_) {
        _loadNotifications();
      });
    } else {
      _unreadCount = 0;
      notifyListeners();
    }
  }

  Future<void> _loadNotifications() async {
    if (!_isAuthenticated || _token == null) return;

    try {
      final notificationService = NotificationService(token: _token);
      final response = await notificationService.getNotifications();
      _unreadCount = response.unreadCount;
      notifyListeners();
    } catch (e) {
      // Silently fail - don't update count on error
      debugPrint('Error loading notifications: $e');
    }
  }

  @override
  void dispose() {
    _pollTimer?.cancel();
    super.dispose();
  }
}
