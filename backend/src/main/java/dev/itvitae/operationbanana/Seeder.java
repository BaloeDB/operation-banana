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

      bananaRepository.saveAll(List.of(new Banana(100L, chiquita),
          new Banana(125L, dole), new Banana(123L, delMonte),
          new Banana(122L, dole), new Banana(150L, zespri),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae),
          new Banana(143L, itvitae)
      ));


    }
  }
}
