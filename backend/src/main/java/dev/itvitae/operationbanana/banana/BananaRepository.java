package dev.itvitae.operationbanana.banana;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BananaRepository extends JpaRepository<Banana, Long> {
  @Query
  List<Banana> findAllByBrandName(String name);

  @Query
  List<Banana> findAllByBrandId(Long id);
}
