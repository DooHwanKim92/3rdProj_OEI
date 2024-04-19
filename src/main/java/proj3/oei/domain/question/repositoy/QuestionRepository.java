package proj3.oei.domain.question.repositoy;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.question.entity.Question;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("select q from Question q where q.member.id = :id")
    List<Question> getMyQList(@Param("id") Long id);

}
