import 'user.dart';

class Rating {
  final String id;
  final int rating;
  final User? user;
  final String locationId;
  final DateTime createdAt;

  Rating({
    required this.id,
    required this.rating,
    this.user,
    required this.locationId,
    required this.createdAt,
  });

  factory Rating.fromJson(Map<String, dynamic> json) {
    String locationId;
    if (json['locationId'] is String) {
      locationId = json['locationId'] as String;
    } else if (json['location'] != null && json['location']['id'] != null) {
      locationId = json['location']['id'] as String;
    } else {
      locationId = ''; 
    }

    return Rating(
      id: json['id'] as String,
      rating: json['rating'] as int,
      user: json['user'] != null ? User.fromJson(json['user'] as Map<String, dynamic>) : null,
      locationId: locationId,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'rating': rating,
      'user': user?.toJson(),
      'locationId': locationId,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

