package dev.itvitae.operationbanana.banana;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BananaService {
  private final BananaRepository bananaRepository;

  public List<Banana> getAll() {
    return bananaRepository.findAll();
  }

  public List<Banana> getAllByBrandName(String name) {
    return bananaRepository.findAllByBrandName(name);
  }
}
