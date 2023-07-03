package com.sergiu.kitchenmanager.domain.entities;

import com.sergiu.kitchenmanager.domain.enums.OrderItemStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "order_items")
public class OrderItemEty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_status")
    private OrderItemStatus status;

    @Column(name = "item_specification")
    private String specification;

    @Column(name = "item_amount")
    private Integer amount;

    @Column(name = "item_price")
    private Double price;

    @ManyToOne
    @JoinColumn(name = "desk_id", referencedColumnName = "desk_id")
    private DeskEty desk;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id")
    private ProductEty product;
}
