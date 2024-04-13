package proj3.oei;

import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import proj3.oei.global.jwt.JwtProvider;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class OeiApplicationTests {

	@Autowired
	private JwtProvider jwtProvider;

	@Value("${custom.jwt.secretkey}")
	private String originSecretKey;

	@Test
	@DisplayName("Check the secret key")
	void checkSecretKey() {
		assertThat(originSecretKey).isNotNull();
	}

	@Test
	@DisplayName("Secret key encoding test")
	void encodeSecretKey() {
		System.out.println("Original SecretKey : " + originSecretKey);
		String keyBase64Encoded = Base64.getEncoder().encodeToString(originSecretKey.getBytes());

		SecretKey testSecretKey = Keys.hmacShaKeyFor(keyBase64Encoded.getBytes());

		assertThat(testSecretKey).isNotNull();
		System.out.println("Encoded SecretKey : " + testSecretKey);
	}

	@Test
	@DisplayName("Create SecretKey by JWT Provider")
	void createSecretKey() {
		SecretKey secretKey = this.jwtProvider.getSecretKey();

		System.out.println(secretKey);
	}

	@Test
	@DisplayName("Test JWT Provider")
	void testSecretKey() {
		SecretKey secretKey1 = this.jwtProvider.getSecretKey();
		SecretKey secretKey2 = this.jwtProvider.getSecretKey();

		System.out.println(secretKey1);
		System.out.println(secretKey2);
	}

	@Test
	@DisplayName("Create Access Token")
	void test6 () {
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", 1L);
		claims.put("username", "user1");

		String accessToken = jwtProvider.genToken(claims, 60 * 60 * 3);

		System.out.println("accessToken : " + accessToken);

		assertThat(accessToken).isNotNull();
	}

	@Test
	@DisplayName("만료된 토큰 유효하지 않은지")
	void test7() {
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", 2L);
		claims.put("username", "admin");

		// 유효성 시간 x
		String accessToken = jwtProvider.genToken(claims, -1);

		System.out.println("accessToken :" + accessToken);

		assertThat(jwtProvider.verify(accessToken)).isFalse();
	}

	@Test
	@DisplayName("access Token을 이용하여 claims 정보 가져오기")
	void test8() {
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", 1L);
		claims.put("username", "admin");

		// 10분
		String accessToken = jwtProvider.genToken(claims, 60 * 10);

		System.out.println("accessToken :" + accessToken);

		assertThat(jwtProvider.verify(accessToken)).isTrue();

		Map<String, Object> claimsFromToken = jwtProvider.getClaims(accessToken);
		System.out.println("claimsFromToken : " + claimsFromToken);
	}



}
