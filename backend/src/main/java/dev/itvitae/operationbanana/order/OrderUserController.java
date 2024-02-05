package dev.itvitae.operationbanana.order;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/api/v1/banana/order")
@RequiredArgsConstructor
public class OrderUserController {
  private final OrderService orderService;

  @GetMapping("/{id}")
  public ResponseEntity<Order> getOrderById(@PathVariable long id) {
    return null;
  }

  @PostMapping("/create")
  public ResponseEntity<Order> postOrder(@RequestBody OrderRequest request, UriComponentsBuilder ucb) {
    final Order order = orderService.createOrder(request);

    if (order == null) {
      return ResponseEntity.badRequest().build();
    }

    URI locationOfNewOrder = ucb
        .path("api/v1/banana/order/{id}")
        .buildAndExpand(order.getId())
        .toUri();

    return ResponseEntity.created(locationOfNewOrder).body(order);
  }
}
