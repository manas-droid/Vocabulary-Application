package com.example.Backend.service;


import com.example.Backend.entity.User;
import com.example.Backend.exception.ArgumentException;
import com.example.Backend.exception.DuplicateEntryException;
import com.example.Backend.repository.UserRepository;
import com.example.Backend.exception.utils.ExceptionMessages;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.id.IdentifierGenerationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final ExceptionMessages exceptionMessages;

    public void registerUser(User user){
        try{
            log.info("Register User :  User Data {}" , user);
            user.setIsNew(true);
            this.userRepository.save(user);
        }catch(IllegalArgumentException e){
            throw new ArgumentException(exceptionMessages.ARGUMENT_EXCEPTION);
        }catch(DataIntegrityViolationException dve){
            throw new DuplicateEntryException(exceptionMessages.DUPLICATE_ENTRY_ERROR);
        }catch (RuntimeException re){
            throw new RuntimeException(re.getLocalizedMessage());
        }
    }


}
