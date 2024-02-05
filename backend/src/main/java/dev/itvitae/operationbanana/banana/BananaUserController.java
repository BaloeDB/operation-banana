package dev.itvitae.operationbanana.banana;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/banana/stock")
public class BananaUserController {
  @GetMapping
  public List<Banana> getAllBananas() {
    return null;
  }

  @GetMapping("/brand")
  public List<Banana> getBananasByBrandName(@RequestParam String name) {
    System.out.println(name);
    return null;
  }
}
