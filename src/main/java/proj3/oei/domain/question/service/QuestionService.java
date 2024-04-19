package proj3.oei.domain.question.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import proj3.oei.domain.member.entity.Member;
import proj3.oei.domain.question.entity.Question;
import proj3.oei.domain.question.repositoy.QuestionRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public void create(Member member, String title, String content) {
        Question question = Question.builder()
                .member(member)
                .title(title)
                .content(content)
                .build();

        this.questionRepository.save(question);
    }

    public List<Question> getMyQList(Member member) {
        return this.questionRepository.getMyQList(member.getId());
    }
}
