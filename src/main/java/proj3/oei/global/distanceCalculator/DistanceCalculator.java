package proj3.oei.global.distanceCalculator;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
@RequiredArgsConstructor
public class DistanceCalculator {

    // Radius of the Earth in kilometers
    private static final double EARTH_RADIUS_KM = 6371.0;

    // Convert degrees to radians
    private static double toRadians(double degrees) {
        return degrees * Math.PI / 180.0;
    }

    // Calculate distance using Haversine formula
    public static double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double dLat = toRadians(lat2 - lat1);
        double dLon = toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_KM * c;
    }

    public static void main(String[] args) {
        // Example coordinates
        double lat1 = 37.7749; // Latitude of point 1
        double lon1 = -122.4194; // Longitude of point 1
        double lat2 = 34.0522; // Latitude of point 2
        double lon2 = -118.2437; // Longitude of point 2

        // Calculate distance
        double distance = calculateDistance(lat1, lon1, lat2, lon2);

        // Output distance
        System.out.println("Distance between the two points: " + distance + " km");
    }
}
