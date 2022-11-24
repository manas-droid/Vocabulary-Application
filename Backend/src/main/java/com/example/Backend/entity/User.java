package com.example.Backend.entity;


import com.example.Backend.entity.utils.DateUtil;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class User extends DateUtil implements Persistable<String> {
    @Id
    private String uId;

    private String picture;

    @Transient
    private Boolean isNew = false;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String username;

    @Override
    public String getId() {
        return this.uId;
    }

    @Override
    public boolean isNew() {
        return this.isNew;
    }

    public void setIsNew(boolean isNew){
        this.isNew = isNew;
    }
}
