package dev.itvitae.operationbanana.order;

import dev.itvitae.operationbanana.banana.Banana;
import dev.itvitae.operationbanana.banana.BananaRepository;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
  private final OrderRepository orderRepository;
  private final BananaRepository bananaRepository;
  private static final int THRESHOLD = 25;

  public Order createOrder(OrderRequest request) {
    final List<Banana> bananas = bananaRepository.findAllByBrandName(request.brandName());


    bananas.sort(Comparator.comparing(Banana::getWeight));
    if (request.amount() < THRESHOLD) {
      bananas.reversed();
    }

    final List<Banana> orderedBananas = bananas.subList(0, request.amount());
    bananaRepository.deleteAll(orderedBananas);

    return orderRepository.save(new Order(orderedBananas));
  }
}
