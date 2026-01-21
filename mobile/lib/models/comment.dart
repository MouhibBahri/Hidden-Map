import 'user.dart';

class Comment {
  final String id;
  final String commentText;
  final User? user;
  final String locationId;
  final DateTime createdAt;

  Comment({
    required this.id,
    required this.commentText,
    this.user,
    required this.locationId,
    required this.createdAt,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    // Handle locationId - it might be a string or nested in location object
    String locationId;
    if (json['locationId'] is String) {
      locationId = json['locationId'] as String;
    } else if (json['location'] != null && json['location']['id'] != null) {
      locationId = json['location']['id'] as String;
    } else {
      locationId = ''; // Fallback
    }

    return Comment(
      id: json['id'] as String,
      commentText: json['commentText'] as String,
      user: json['user'] != null ? User.fromJson(json['user'] as Map<String, dynamic>) : null,
      locationId: locationId,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'commentText': commentText,
      'user': user?.toJson(),
      'locationId': locationId,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

