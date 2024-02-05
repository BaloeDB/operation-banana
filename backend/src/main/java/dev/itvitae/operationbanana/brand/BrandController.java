package dev.itvitae.operationbanana.brand;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("/api/v1/banana/brands")
public class BrandController {

  private final BrandService brandService;
  @GetMapping
  public ResponseEntity<List<Brand>> getAllBananas() {
    return ResponseEntity.ok(brandService.getAll());
  }
}
