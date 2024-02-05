package dev.itvitae.operationbanana.order;

import dev.itvitae.operationbanana.banana.Banana;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
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
}
