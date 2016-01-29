package com.springapp.mvc.util;

import org.hibernate.Criteria;
import org.hibernate.EntityMode;
import org.hibernate.Hibernate;
import org.hibernate.HibernateException;
import org.hibernate.criterion.CriteriaQuery;
import org.hibernate.criterion.Criterion;
import org.hibernate.engine.TypedValue;

/**
 * Created by Pongpipat on 13/4/2558.
 */
@SuppressWarnings("serial")
public class LengthExpression implements Criterion {
    private final String propertyName;
    private final int value;

    public LengthExpression(final String propertyName, final int value) {
        this.propertyName = propertyName;
        this.value = value;
    }

    @Override
    public String toSqlString(final Criteria criteria,
                              final CriteriaQuery criteriaQuery) throws HibernateException {
        criteriaQuery.getFactory().getDialect();
        final String[] columns = criteriaQuery.getColumnsUsingProjection(
                criteria, this.propertyName);
        final String queryFragment = "length(" + columns[0] + ") = ?";
        return queryFragment;
    }

    @Override
    public TypedValue[] getTypedValues(final Criteria criteria,
                                       final CriteriaQuery criteriaQuery) throws HibernateException {
        // An ordered pair of a value and its Hibernate type
        return new TypedValue[] { new TypedValue(Hibernate.INTEGER,
                Integer.valueOf(value), EntityMode.POJO) };
    }
}
