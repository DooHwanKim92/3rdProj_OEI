package proj3.oei.domain.review.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.review.entity.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
}
