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
    return brandRepository.findById(id);
  }

  public List<Brand> getAll() {
    return brandRepository.findAll();
  }

}
