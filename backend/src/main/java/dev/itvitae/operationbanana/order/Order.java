package dev.itvitae.operationbanana.order;

import dev.itvitae.operationbanana.banana.Banana;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="`order`")
@Getter
@Setter
@NoArgsConstructor
public class Order {
  @Id
  @GeneratedValue
  private long id;

  private BigDecimal price;
  @OneToMany
  private List<Banana> bananas;
  private LocalDateTime date;


  public Order(List<Banana> bananas) {
    this.bananas = bananas;
    this.price = BigDecimal.ZERO;
    for (Banana banana: bananas) {
      this.price = this.price.add(banana.getPrice());
    }
    this.date = LocalDateTime.now();
  }
}
