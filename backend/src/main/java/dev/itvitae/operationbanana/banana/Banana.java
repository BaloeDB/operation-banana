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

  private Double weight;

  private LocalDateTime date;
  private boolean isSold;

  public BigDecimal getPrice() {
    return brand.getPricePerKg().multiply(BigDecimal.valueOf(weight));
  }

  public boolean inStock() {
    return !isSold;
  }

  public void sell() {
    isSold = true;
  }


  public Banana(Double weight, LocalDateTime date, Brand brand) {
    this.weight = weight;
    this.date = date;
    this.brand = brand;
    this.isSold = false;
  }

  public Banana(Double weight, Brand brand) {
    this(weight, LocalDateTime.now(), brand);
  }
}
