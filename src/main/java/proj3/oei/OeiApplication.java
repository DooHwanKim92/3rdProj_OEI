package proj3.oei;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class OeiApplication {

	public static void main(String[] args) {
		SpringApplication.run(OeiApplication.class, args);
	}

}
