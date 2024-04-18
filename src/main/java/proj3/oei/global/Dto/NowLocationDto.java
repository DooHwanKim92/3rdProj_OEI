package proj3.oei.global.Dto;


import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class NowLocationDto {

    private double lat;

    private double lon;

    public NowLocationDto(String lat, String lon) {
        this.lat = Double.parseDouble(lat);
        this.lon = Double.parseDouble(lon);
    }

}
