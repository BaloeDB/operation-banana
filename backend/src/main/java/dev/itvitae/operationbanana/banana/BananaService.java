package dev.itvitae.operationbanana.banana;

import dev.itvitae.operationbanana.brand.Brand;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BananaService {
  private final BananaRepository bananaRepository;

  public List<Banana> getAll() {
    return bananaRepository.findAll().stream().filter(Banana::inStock).toList();
  }

  public List<Banana> getAllByBrandName(String name) {
    return bananaRepository.findAllByBrandName(name).stream().filter(Banana::inStock).toList();
  }

  public List<Banana>   getAllByBrandId(Long id) {
    return bananaRepository.findAllByBrandId(id).stream().filter(Banana::inStock).toList();
  }

  public Banana createBanana(Double weight, LocalDateTime dateTime, Brand brand) {
    return bananaRepository.save(new Banana(weight, dateTime, brand));
  }
}
