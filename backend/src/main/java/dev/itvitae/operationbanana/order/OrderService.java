package dev.itvitae.operationbanana.order;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
  private final OrderRepository orderRepository;

  public Order createOrder(OrderRequest request) {
    System.out.println(request);
    return orderRepository.save(new Order());
  }
}
