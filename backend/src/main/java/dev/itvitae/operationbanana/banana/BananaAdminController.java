package dev.itvitae.operationbanana.banana;

import dev.itvitae.operationbanana.brand.Brand;
import dev.itvitae.operationbanana.brand.BrandService;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/banana/admin")
public class BananaAdminController {
  private final BananaService bananaService;
  private final BrandService brandService;

  private record BananaBody(Double weight, Long brandId) {}
  @PostMapping("/create")
  public ResponseEntity<Banana> createBanana(@RequestBody BananaBody bananaBody, UriComponentsBuilder ucb) {
      Optional<Brand> brand = brandService.getBrandById(bananaBody.brandId);
      if (bananaBody.weight != null && brand.isPresent()) {
        Banana product = bananaService.createBanana(bananaBody.weight, LocalDateTime.now(), brand.get());
        URI locationOfNewBanana = ucb
            .path("/api/v1/banana/stock/{id}")
            .buildAndExpand(bananaService.getAll().size())
            .toUri();
        return ResponseEntity.created(locationOfNewBanana).body(product);
      } else {
        return ResponseEntity.badRequest().build();
      }

    }


}
