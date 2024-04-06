package proj3.oei.domain.siteuser.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.siteuser.entity.SiteUser;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {
}
