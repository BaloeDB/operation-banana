package dev.itvitae.operationbanana.order;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/banana/order")
public class OrderAdminController {
  @PostMapping
  public OrderResponse postOrder(@RequestBody OrderRequest order) {
    System.out.println(order);
    return null;
  }
}
