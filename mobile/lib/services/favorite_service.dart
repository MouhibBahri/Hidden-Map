import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/constants.dart';
import '../models/favorite.dart';
import '../models/location.dart';

class FavoriteService {
  final Dio _dio;
  String? _token;

  FavoriteService()
      : _dio = Dio(
          BaseOptions(
            baseUrl: ApiConstants.baseUrl,
            connectTimeout: const Duration(seconds: 5),
            receiveTimeout: const Duration(seconds: 3),
          ),
        ) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          if (_token == null) {
            final prefs = await SharedPreferences.getInstance();
            _token = prefs.getString('auth_token');
          }
          if (_token != null) {
            options.headers['Authorization'] = 'Bearer $_token';
          }
          return handler.next(options);
        },
      ),
    );
  }

  Future<bool> isFavorite(String locationId) async {
    try {
      final response = await _dio.get('/locations/$locationId/favorite/check');
      print('isFavorite response for $locationId: ${response.data}');
      print('isFavorite response type: ${response.data.runtimeType}');
      
      if (response.data is bool) {
        final result = response.data as bool;
        print('Parsed as bool: $result');
        return result;
      }
      if (response.data is Map && response.data['isFavorite'] != null) {
        final result = response.data['isFavorite'] as bool;
        print('Parsed from map: $result');
        return result;
      }
      print('Could not parse, defaulting to false');
      return false;
    } on DioException catch (e) {
      print('isFavorite error: ${e.response?.statusCode} - ${e.response?.data}');
      if (e.response?.statusCode == 404) {
        return false;
      }
      throw Exception('Failed to check favorite status: ${e.message}');
    } catch (e) {
      print('isFavorite unexpected error: $e');
      throw Exception('Failed to check favorite status: $e');
    }
  }

  Future<List<Location>> getUserFavorites() async {
    try {
      final response = await _dio.get('/favorites');
      final List<dynamic> data = response.data as List<dynamic>;
      return data
          .where((json) => json['location'] != null)
          .map((json) => Location.fromJson(json['location'] as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw Exception('Failed to load favorites: $e');
    }
  }

  Future<bool> addFavorite(String locationId) async {
    try {
      print('Adding favorite for location: $locationId');
      final response = await _dio.post('/locations/$locationId/favorite');
      print('Add favorite response: ${response.statusCode} - ${response.data}');
      
      return response.statusCode != null && response.statusCode! >= 200 && response.statusCode! < 300;
    } on DioException catch (e) {
      print('Add favorite error: ${e.response?.statusCode} - ${e.response?.data}');
      if (e.response?.statusCode == 409 || 
          (e.response?.statusCode == 500 && 
           e.response?.data?.toString().contains('duplicate key') == true)) {
        print('Duplicate favorite detected, treating as success');
        return true;
      }
      throw Exception('Failed to add favorite: ${e.message}');
    } catch (e) {
      print('Add favorite unexpected error: $e');
      throw Exception('Failed to add favorite: $e');
    }
  }

  Future<void> removeFavorite(String locationId) async {
    try {
      print('Removing favorite for location: $locationId');
      final response = await _dio.delete('/locations/$locationId/favorite');
      print('Remove favorite response: ${response.statusCode}');
    } on DioException catch (e) {
      print('Remove favorite error: ${e.response?.statusCode} - ${e.response?.data}');
      if (e.response?.statusCode == 404) {
        print('Favorite not found, treating as success');
        return;
      }
      throw Exception('Failed to remove favorite: ${e.message}');
    } catch (e) {
      print('Remove favorite unexpected error: $e');
      throw Exception('Failed to remove favorite: $e');
    }
  }
}

