package com.springapp.mvc.util;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;
//
//import com.fission.core.bean.BeanIntrospector;
//import com.fission.core.reflect.TypeReflectionUtils;
//import com.ss.rms.entity.BaseEntity;
//import com.ss.rms.entity.BaseEntityModel;
//import com.ss.rms.exception.RMSException;
//import com.ss.rms.exception.RMSExceptionMessage;

public class BeanUtils {

	public static boolean isEmpty(String st){
		boolean b = true;
		if(st!=null && st.trim().length()>0){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(StringBuilder st){
		boolean b = true;
		if(st!=null && st.toString().trim().length()>0){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(List<?> ls ){
		boolean b = true;
		if(ls!=null && !ls.isEmpty()){
			b = false;
		}
		return (b);

	}

	public static boolean isEmpty(Map<?, ?> map){
		boolean b = true;
		if(map!=null && !map.isEmpty()){
			b = false;
		}
		return(b);
	}

	public static boolean isEmpty(Set<?> set){
		boolean b = true;
		if(set!=null && !set.isEmpty()){
			b = false;
		}
		return(b);
	}
	
	public static boolean isEmpty(Integer integer){
		boolean b = isNull(integer);
		return (b);

	}

	public static boolean isEmpty(Byte byt){
		boolean b = isNull(byt);
		return (b);

	}

	public static boolean isEmpty(Short s){
		boolean b = isNull(s);
		return (b);

	}

	public static boolean isEmpty(Long l){
		boolean b = isNull(l);
		return (b);

	}

	public static boolean isEmpty(Character c){
		boolean b = isNull(c);
		return (b);

	}

	public static boolean isEmpty(Float f){
		boolean b = isNull(f);
		return (b);

	}

	public static boolean isEmpty(Double d){
		boolean b = isNull(d);
		return (b);

	}

	public static boolean isEmpty(Number num){
		boolean b = isNull(num);
		return (b);

	}

	public static boolean isEmpty(BigDecimal d){
		boolean b = isNull(d);
		return (b);

	}

	public static boolean isNull(Object obj){
		boolean b = true;
		if(obj != null){
			b = false;
		}
		return (b);
	}

	public static Object getDefaultValueIfNull(Object value, Object defaultValue){
		Object result = defaultValue;
		if(value != null){
			result = value;
		}
		return(result);
	}

	public static boolean isNotEmpty(String st){
		boolean b = true;
		if(st ==null || st.trim().length()==0){
			b = false;
		}
		return (b);

	}

	public static boolean isNotEmpty(List<?> ls ){
		boolean b = false;
		if(ls!=null && !ls.isEmpty()){
			b = true;
		}
		return (b);

	}

	public static boolean isNotEmpty(Map<?,?> map){
		boolean b = false;
		if(map!=null && !map.isEmpty()){
			b = true;
		}
		return(b);
	}

	public static boolean isNotEmpty(Set<?> set){
		boolean b = false;
		if(set!=null && !set.isEmpty()){
			b = true;
		}
		return(b);
	}
	
	public static boolean isNotEmpty(Integer integer){
		boolean b = isNotNull(integer);
		return (b);

	}

	public static boolean isNotEmpty(Byte byt){
		boolean b = isNotNull(byt);
		return (b);

	}

	public static boolean isNotEmpty(Short s){
		boolean b = isNotNull(s);
		return (b);

	}

	public static boolean isNotEmpty(Long l){
		boolean b = isNotNull(l);
		return (b);

	}

	public static boolean isNotEmpty(Character c){
		boolean b = isNotNull(c);
		return (b);

	}

	public static boolean isNotEmpty(Float f){
		boolean b = isNotNull(f);
		return (b);

	}

	public static boolean isNotEmpty(Double d){
		boolean b = isNotNull(d);
		return (b);

	}

	public static boolean isNotEmpty(Number num){
		boolean b = isNotNull(num);
		return (b);

	}

	public static boolean isNotEmpty(BigDecimal d){
		boolean b = isNotNull(d);
		return (b);

	}

	public static boolean isNotEmpty(Object obj){
		boolean b = false;
		if(obj != null){
			b = true;
		}
		return (b);
	}

	public static boolean isNotNull(Object obj){
		boolean b = false;
		if(obj != null){
			b = true;
		}
		return (b);
	}
	
//	public static Map<String, Object> convertBeanToMap(Object bean, List<String> excludeProperties) {
//		Map<String, Object> map = new HashMap<String, Object>();
//		PropertyDescriptor[] propertyDescriptors = org.springframework.beans.BeanUtils.getPropertyDescriptors(bean.getClass());
//		for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
//
//			if ((BeanUtils.isEmpty(excludeProperties))
//					|| (BeanUtils.isNotEmpty(excludeProperties)
//							&& !excludeProperties.contains(propertyDescriptor.getName()))) {
//
//				Method method = propertyDescriptor.getReadMethod();
//				if (BeanUtils.isNotNull(method)) {
//					try {
//						Object object = method.invoke(bean);
//						map.put(propertyDescriptor.getName(), object);
//					} catch (IllegalArgumentException e) {
//						throw new RMSException(RMSExceptionMessage.PROGRAM_PROBLEM_PLEASE_CONTACT_ADMIN,e);
//					} catch (IllegalAccessException e) {
//						throw new RMSException(RMSExceptionMessage.PROGRAM_PROBLEM_PLEASE_CONTACT_ADMIN,e);
//					} catch (InvocationTargetException e) {
//						throw new RMSException(RMSExceptionMessage.PROGRAM_PROBLEM_PLEASE_CONTACT_ADMIN,e);
//					}
//				}
//			}
//		}
//		return map;
//	}
//
//	public static Set<String> getBeanProperties(Class clazz){
//		Set<String> set = new HashSet<String>();
//		List<Method> accessors = TypeReflectionUtils.getAccessors(clazz);
//		for (Method accessor : accessors) {
//			Class cls = accessor.getReturnType().getSuperclass();
//			if(!(BaseEntity.class.equals(cls) || BaseEntityModel.class.equals(cls))){
//				String property = BeanIntrospector.getPropertyFromAccessorMutator(accessor.getName());
//				set.add(property);
//			}
//		}
//		set.remove("class");
//		return set;
//	}
}
