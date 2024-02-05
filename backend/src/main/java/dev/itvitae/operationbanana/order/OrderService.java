package dev.itvitae.operationbanana.order;

import dev.itvitae.operationbanana.banana.Banana;
import dev.itvitae.operationbanana.banana.BananaRepository;
import dev.itvitae.operationbanana.banana.BananaService;
import java.util.ArrayList;
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
  private final BananaService bananaService;
  private static final int THRESHOLD = 25;

  public Order createOrder(OrderRequest request) {
    final List<Banana> bananas = new ArrayList<>(bananaService.getAllByBrandName(request.brandName()));

    if (bananas.size() < request.amount()) {
      return null;
    }

    bananas.sort(Comparator.comparing(Banana::getWeight));
    if (request.amount() < THRESHOLD) {
      bananas.reversed();
    }

    final List<Banana> orderedBananas = bananas.subList(0, request.amount());
    orderedBananas.forEach(Banana::sell);
    bananaRepository.saveAll(orderedBananas);

    return orderRepository.save(new Order(orderedBananas));
  }
}
