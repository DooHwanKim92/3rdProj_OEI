package proj3.oei.domain.lastlocation.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.lastlocation.entity.LastLocation;
import proj3.oei.domain.lastlocation.repository.LastLocationRepository;
import proj3.oei.domain.member.entity.Member;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LastLocationService {

    private final LastLocationRepository lastLocationRepository;

    public LastLocation createLastLocation(Member member, String lat, String lon) {
        LastLocation lastLocation = LastLocation.builder()
                .lat(lat)
                .lon(lon)
                .member(member)
                .build();

        this.lastLocationRepository.save(lastLocation);

        return lastLocation;
    }
}
