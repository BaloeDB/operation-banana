package dev.itvitae.operationbanana.banana;

import dev.itvitae.operationbanana.Seeder;
import dev.itvitae.operationbanana.brand.Brand;
import dev.itvitae.operationbanana.brand.BrandService;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/banana/admin")
public class BananaAdminController {

  private final BananaService bananaService;
  private final BrandService brandService;

  private record BananaBody(Double amount, Long brandId) {

  }

  @PostMapping("/create")
  public ResponseEntity<List<Banana>> createBanana(@RequestBody BananaBody bananaBody,
      UriComponentsBuilder ucb) {
    Optional<Brand> brand = brandService.getBrandById(bananaBody.brandId);
    if (bananaBody.amount != null && brand.isPresent()) {
      List<Banana> bananas = new ArrayList<>();
      for (int i = 0; i < bananaBody.amount; i++) {
        bananas.add(
            bananaService.createBanana(Seeder.randomWeight(), LocalDateTime.now(), brand.get()));
      }
      URI locationOfNewBananas = ucb
          .path("/api/v1/banana/stock/{id}")
          .buildAndExpand(bananaService.getAll().size())
          .toUri();
      return ResponseEntity.created(locationOfNewBananas).body(bananas);
    } else {
      return ResponseEntity.badRequest().build();
    }
  }
}
