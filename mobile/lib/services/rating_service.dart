import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../config/constants.dart';
import '../models/rating.dart';

class RatingService {
  final Dio _dio;
  String? _token;

  RatingService()
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

  Future<List<Rating>> getRatingsByLocation(String locationId) async {
    try {
      final response = await _dio.get('/locations/$locationId/ratings');
      final List<dynamic> data = response.data as List<dynamic>;
      return data.map((json) => Rating.fromJson(json as Map<String, dynamic>)).toList();
    } catch (e) {
      throw Exception('Failed to load ratings: $e');
    }
  }

  Future<double> getAverageRating(String locationId) async {
    try {
      final response = await _dio.get('/locations/$locationId/ratings/average');
      if (response.data is num) {
        return (response.data as num).toDouble();
      }
      return 0.0;
    } catch (e) {
      throw Exception('Failed to load average rating: $e');
    }
  }

  Future<Rating?> rateLocation(String locationId, int rating) async {
    try {
      final response = await _dio.post(
        '/locations/$locationId/ratings',
        data: {'rating': rating},
      );
      try {
        return Rating.fromJson(response.data as Map<String, dynamic>);
      } catch (parseError) {
        if (response.statusCode != null && response.statusCode! >= 200 && response.statusCode! < 300) {
          return null;
        }
        throw parseError;
      }
    } on DioException catch (e) {
      throw Exception('Failed to rate location: ${e.message}');
    } catch (e) {
      throw Exception('Failed to rate location: $e');
    }
  }

  Future<int?> getUserRating(String locationId) async {
    try {
      final ratings = await getRatingsByLocation(locationId);
      // we should have an endpoint that returns just the current user's rating
      if (ratings.isNotEmpty) {
        return ratings.first.rating;
      }
      return null;
    } catch (e) {
      print('Failed to get user rating: $e');
      return null;
    }
  }
}
