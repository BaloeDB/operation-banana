package dev.itvitae.operationbanana.banana;

import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/banana/stock")
public class BananaUserController {
  private final BananaService bananaService;
  @GetMapping
  public ResponseEntity<List<Banana>> getAllBananas() {
    return ResponseEntity.ok(bananaService.getAll());
  }

  @GetMapping("/brand")
  public ResponseEntity<List<Banana>> getBananasByBrandName(@RequestParam String name) {
    return ResponseEntity.ok(bananaService.getAllByBrandName(name));
  }
}
