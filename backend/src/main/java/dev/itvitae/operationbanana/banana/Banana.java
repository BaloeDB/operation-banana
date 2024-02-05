package dev.itvitae.operationbanana.banana;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
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

//  @ManyToOne
//  private Brand brand;

  private Long weight;

  private LocalDateTime date;

  public Banana(Long weight, LocalDateTime date) {
    this.weight = weight;
    this.date = date;
  }

  public Banana(Long weight) {
    this.weight = weight;
    this.date = LocalDateTime.now();
  }
}
