package proj3.oei.domain.lastlocation.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.lastlocation.entity.LastLocation;

@Repository
public interface LastLocationRepository extends JpaRepository<LastLocation, Long> {
}
