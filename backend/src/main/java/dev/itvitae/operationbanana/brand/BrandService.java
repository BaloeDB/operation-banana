package dev.itvitae.operationbanana.brand;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BrandService {
  private final BrandRepository brandRepository;

  public Optional<Brand> getBrandById(Long id) {
    Optional<Brand> brand = brandRepository.findById(id);
    if (brand.isEmpty()) {
      return Optional.of(brandRepository.save(new Brand("nameless brand", new BigDecimal("1.49"), "china")));
    } else {
      return brand;
    }
  }

  public List<Brand> getAll() {
    return brandRepository.findAll();
  }

}
