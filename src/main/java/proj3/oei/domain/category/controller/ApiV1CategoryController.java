package proj3.oei.domain.category.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import proj3.oei.domain.article.controller.ApiV1ArticleController;
import proj3.oei.domain.article.entity.Article;
import proj3.oei.domain.category.entity.Category;
import proj3.oei.domain.category.service.CategoryService;
import proj3.oei.global.resultData.RsData;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class ApiV1CategoryController {

    private final CategoryService categoryService;

    public void createCategory(String name) {
        this.categoryService.create(name);
    }

    @Getter
    @AllArgsConstructor
    public static class CategoriesResponse {
        private final List<Category> categories;
    }

    @Getter
    @AllArgsConstructor
    public static class CategoryResponse {
        private final Category category;
    }

    @GetMapping("")
    public RsData<CategoriesResponse> getCategory() {
        List<Category> categories = this.categoryService.findAll();
        return RsData.of("S-1", "성공", new CategoriesResponse(categories));
    }

}
