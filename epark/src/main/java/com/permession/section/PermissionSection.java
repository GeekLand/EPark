package com.permession.section;

import java.lang.reflect.Method;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import com.permession.annotation.PermissionCheck;
import com.permession.exception.PermissionCheckException;

/**
 * 对权限注解的切面
 * 
 * @author weiguangming
 *
 */
@Aspect // 切面标识
@Component // 将该类交给spring容器
public class PermissionSection {

	/**
	 * 选取切入点为自定义注解
	 */
	@Pointcut("@annotation(com.permission.annotation.PermissionCheck)")
	public void permissionCheck() {
	}

	/**
	 * 在切入点业务逻辑之前执行
	 * 
	 * @param joinPoint
	 * @throws NoSuchMethodException
	 */
	@Before(value = "permissionCheck();")
	public void before(JoinPoint joinPoint) throws NoSuchMethodException {
		Signature signature = joinPoint.getSignature(); // 获取连接点的方法签名对象
		if (!(signature instanceof MethodSignature)) {
			throw new PermissionCheckException("user permission check fail,stop this request!");
		}
		MethodSignature methodSignature = (MethodSignature) signature;
		Object target = joinPoint.getTarget();
		Method method = target.getClass().getMethod(methodSignature.getName(), methodSignature.getParameterTypes()); // 获取到当前执行的方法
		PermissionCheck annotation = method.getAnnotation(PermissionCheck.class); // 获取方法的注解
		System.out.println(annotation);
		System.out.println("业务逻辑之前执行");
	}

	/**
	 * 在业务逻辑之后执行
	 * 
	 * @param joinPoint
	 */
	@After(value = "permissionCheck();")
	public void after(JoinPoint joinPoint) {
		System.out.println("在业务之后执行");
	}
}
