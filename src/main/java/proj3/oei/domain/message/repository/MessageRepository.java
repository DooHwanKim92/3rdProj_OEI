package proj3.oei.domain.message.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import proj3.oei.domain.message.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where m.member.id = :id")
    List<Message> getMyMessages(@Param("id") Long id);
}
