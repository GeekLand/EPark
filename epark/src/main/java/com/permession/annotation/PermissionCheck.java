package com.permession.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.TYPE, ElementType.METHOD }) // 注解类型，级别
@Retention(RetentionPolicy.RUNTIME) // 运行时注解
public @interface PermissionCheck {
	String value() default "";
}
