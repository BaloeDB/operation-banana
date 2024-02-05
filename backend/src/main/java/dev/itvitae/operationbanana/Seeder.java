package dev.itvitae.operationbanana;

import dev.itvitae.operationbanana.banana.Banana;
import dev.itvitae.operationbanana.banana.BananaRepository;
import dev.itvitae.operationbanana.brand.Brand;
import dev.itvitae.operationbanana.brand.BrandRepository;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Seeder implements CommandLineRunner {

  private final BananaRepository bananaRepository;
  private final BrandRepository brandRepository;

  private double randomWeight() {
    final double minWeight = 0.1;
    final double maxWeight = 0.15;

    return (Math.random() * (maxWeight - minWeight)) + minWeight;
  }

  @Override
  public void run(String... args) {
    if (bananaRepository.count() == 0 && brandRepository.count() == 0) {

      Brand chiquita = new Brand("Chiquita", new BigDecimal("100.00"), "Ecuador");
      brandRepository.save(chiquita);

      Brand dole = new Brand("Dole", new BigDecimal("1.00"), "Brazil");
      brandRepository.save(dole);

      Brand delMonte = new Brand("Del Monte", new BigDecimal("1.59"), "Philippines");
      brandRepository.save(delMonte);

      Brand zespri = new Brand("Zespri", new BigDecimal("1.29"), "Indonesia");
      brandRepository.save(zespri);

      Brand itvitae = new Brand("ITvitae", new BigDecimal("0.50"), "Netherlands");
      brandRepository.save(itvitae);

      final int bananasPerBrand = 100;
      for (int i = 0; i < bananasPerBrand; i++) {
        bananaRepository.saveAll(List.of(
            new Banana(randomWeight(), chiquita),
            new Banana(randomWeight(), dole),
            new Banana(randomWeight(), delMonte),
            new Banana(randomWeight(), zespri),
            new Banana(randomWeight(), itvitae)
        ));
      }
    }
  }
}
