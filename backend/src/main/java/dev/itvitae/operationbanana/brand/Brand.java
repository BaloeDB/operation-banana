package dev.itvitae.operationbanana.brand;

import dev.itvitae.operationbanana.banana.Banana;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Brand {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private BigDecimal pricePerKg;

  private String origin;

  @OneToMany
  private Set<Banana> bananas;


  public Brand(String name, BigDecimal pricePerKg, String origin) {
    this.name = name;
    this.pricePerKg = pricePerKg;
    this.origin = origin;
  }
}
