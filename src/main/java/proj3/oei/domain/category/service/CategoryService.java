package proj3.oei.domain.category.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.category.entity.Category;
import proj3.oei.domain.category.repository.CategoryReposiory;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryReposiory categoryReposiory;

    public void create(String name) {
        Category category = Category.builder()
                .name(name)
                .build();

        this.categoryReposiory.save(category);
    }

    public List<Category> findAll() {
        return this.categoryReposiory.findAll();
    }
}
