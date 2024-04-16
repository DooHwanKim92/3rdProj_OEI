package proj3.oei.domain.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.category.entity.Category;

@Repository
public interface CategoryReposiory extends JpaRepository<Category, Long> {
}
