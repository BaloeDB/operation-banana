package dev.itvitae.operationbanana.banana;

import dev.itvitae.operationbanana.brand.Brand;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Banana {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  private Brand brand;

  private Long weight;

  private LocalDateTime date;

  public BigDecimal getPrice() {
    return brand.getPricePerKg().multiply(BigDecimal.valueOf(weight));
  }


  public Banana(Long weight, LocalDateTime date, Brand brand) {
    this.weight = weight;
    this.date = date;
    this.brand = brand;
  }

  public Banana(Long weight, Brand brand) {
    this.weight = weight;
    this.date = LocalDateTime.now();
    this.brand = brand;
  }
}
