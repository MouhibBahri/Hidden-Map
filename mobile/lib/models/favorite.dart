class Favorite {
  final String id;
  final String? userId;
  final String? locationId;
  final DateTime createdAt;

  Favorite({
    required this.id,
    this.userId,
    this.locationId,
    required this.createdAt,
  });

  factory Favorite.fromJson(Map<String, dynamic> json) {
    return Favorite(
      id: json['id'] as String,
      userId: json['userId'] as String?,
      locationId: json['locationId'] as String?,
      createdAt: DateTime.parse(json['createdAt'] as String),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'userId': userId,
      'locationId': locationId,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

