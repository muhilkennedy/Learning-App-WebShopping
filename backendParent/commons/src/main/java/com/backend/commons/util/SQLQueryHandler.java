package com.backend.commons.util;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.google.common.base.Functions;
import com.google.common.collect.Lists;

/**
 * @author Muhil kennedy
 * Builder pattern to handle query builder actions.
 *
 */
public class SQLQueryHandler {

	private String query;	

	public String getQuery() {
		return query;
	}

	private SQLQueryHandler(SQLQueryBuilder builder) {
		this.query = builder.query;
	}

	public static class SQLQueryBuilder {
		
		private String query;
		
		public static final String Key_WhereClause = " where ";
		public static final String Key_SetClause = " set ";
		public static final String Key_OrCondition = " or ";
		public static final String Key_AndCondition = " and ";
		public static final String Key_LimitCondition = " limit ";
		public static final String Key_OffsetCondition = " offset ";
		public static final String Key_Equals = " = ";
		public static final String Key_GreaterThan = " > ";
		public static final String Key_LesserThan = " < ";
		public static final String Key_StartBrace = " ( ";
		public static final String Key_EndBrace = " ) ";
		public static final String Key_OrderBy = " order by ";
		public static final String Key_GroupBy = " group by ";
		public static final String Key_Ascending = " asc ";
		public static final String Key_Descending = " desc ";
		public static final String Key_Like = " like ";
		public static final String Key_NotEqual = " <> ";

		public SQLQueryHandler build() {
			return new SQLQueryHandler(this);
		}

		public SQLQueryBuilder setQuery(String query) {
			this.query = query;
			return this;
		}

		public SQLQueryBuilder setWhereClause() {
			if (this.query.contains(Key_WhereClause.trim())) {
				return this;
			}
			this.query = query.concat(Key_WhereClause);
			return this;
		}
		
		public SQLQueryBuilder setStartBrace() {
			this.query = query.concat(Key_StartBrace);
			return this;
		}
		
		public SQLQueryBuilder setAndCondition() {
			this.query = query.concat(Key_AndCondition);
			return this;
		}
		
		public SQLQueryBuilder setOrCondition() {
			this.query = query.concat(Key_OrCondition);
			return this;
		}
		
		public SQLQueryBuilder setEndBrace() {
			this.query = query.concat(Key_EndBrace);
			return this;
		}
		
		public SQLQueryBuilder setGroupby(String fieldName) {
			if(StringUtils.isBlank(fieldName)) {
				return this;
			}
			this.query = query.concat(Key_GroupBy).concat(fieldName);
			return this;
		}
		
		public SQLQueryBuilder setOrderBy(String fieldName) {
			if(StringUtils.isBlank(fieldName)) {
				return this;
			}
			this.query = query.concat(Key_OrderBy).concat(fieldName);
			return this;
		}
		
		public SQLQueryBuilder setSortOrder(boolean isDescending) {
			if(isDescending) {
				this.query = query.concat(Key_Descending);
			}
			else {
				this.query = query.concat(Key_Ascending);
			}
			return this;
		}
		
		public SQLQueryBuilder setSortOrder(String sortOrder) {
			if(StringUtils.isBlank(sortOrder)) {
				return this;
			}
			return setSortOrder(sortOrder.equals(Key_Descending.trim()) ? true : false);
		}
		
		public SQLQueryBuilder setAndConditionForInt(String fieldName, List<Integer> values) {
			return setAndCondition(fieldName, values != null ? Lists.transform(values, Functions.toStringFunction()) : null);
		}
		
		public SQLQueryBuilder setAndCondition(String fieldName, Integer value , boolean prefixAnd) {
			List<Integer> arrayList = new ArrayList<>();
			arrayList.add(value);
			this.query = this.query.concat(Key_AndCondition);
			if(prefixAnd) {
				return setAndConditionForInt(fieldName, arrayList);
			}
			return setAndConditionForInt(fieldName, arrayList);
		}
		
		public SQLQueryBuilder setAndCondition(String fieldName, String value, boolean prefixAnd) {
			if(value == null) {
				return this;
			}
			List<String> arrayList = new ArrayList<>();
			arrayList.add(value);
			if(prefixAnd) {
				this.query = this.query.concat(Key_AndCondition);
				return setAndCondition(fieldName, arrayList);
			}
			return setAndCondition(fieldName, arrayList);
		}
		
		public SQLQueryBuilder setAndCondition(String fieldName, Boolean value, boolean prefixAnd) {
			if(value == null) {
				return this;
			}
			List<Boolean> arrayList = new ArrayList<>();
			arrayList.add(value);
			if(prefixAnd) {
				this.query = this.query.concat(Key_AndCondition);
				return setAndCondition(fieldName, arrayList);
			}
			return setAndCondition(fieldName, arrayList);
		}
		
		public SQLQueryBuilder setAndCondition(String fieldName, String value) {
			return setAndCondition(fieldName, value, false);
		}
		
		public SQLQueryBuilder andSetAndCondition(String fieldName, String value) {
			return setAndCondition(fieldName, value, true);
		}
		
		public SQLQueryBuilder andSetAndCondition(String fieldName, Long value) {
			return setAndCondition(fieldName, value.toString(), true);
		}
		
		public SQLQueryBuilder andSetAndCondition(String fieldName, Integer value) {
			if(value ==  null)
			{
				return this;
			}
			return setAndCondition(fieldName, value, true);
		}
		
		public SQLQueryBuilder andSetAndCondition(String fieldName, boolean value) {
			return setAndCondition(fieldName, value, true);
		}

		public SQLQueryBuilder setAndCondition(String fieldName, List<?> values) {
			int count = 1;
			setStartBrace();
			if(values.size() > 0 && values.get(0) instanceof String) {
				for (int j=0; j<values.size(); j++) {
					String value = (String)values.get(j);
					if (count == values.size()) {
						this.query = this.query.concat(fieldName.concat(Key_Equals).concat("\"").concat(value).concat("\""));
					} else {
						this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value).concat(Key_AndCondition));
					}
					count++;
				}
			}
			else if(values.size() > 0 && values.get(0) instanceof Boolean) {
				for (int j=0; j<values.size(); j++) {
					Boolean value = (Boolean)values.get(j);
					if (count == values.size()) {
						this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value.toString()));
					} else {
						this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value.toString()).concat(Key_AndCondition));
					}
					count++;
				}
			}
			setEndBrace();
			return this;
		}

		public SQLQueryBuilder setOrConditionForInt(String fieldName, List<Integer> values) {
			return setOrCondition(fieldName, values != null ? Lists.transform(values, Functions.toStringFunction()) : null);
		}
		
		public SQLQueryBuilder andSetOrConditions(String fieldName, List values) {
			return andSetOrCondition(fieldName, values != null ? Lists.transform(values, Functions.toStringFunction()) : null);
		}
		
		public SQLQueryBuilder setOrCondition(String fieldName, Integer value, boolean prefixOr) {
			List<Integer> arrayList = new ArrayList<>();
			arrayList.add(value);
			if(prefixOr) {
				this.query = this.query.concat(Key_OrCondition);
				return setAndConditionForInt(fieldName, arrayList);
			}
			return setOrConditionForInt(fieldName, arrayList);
		}

		public SQLQueryBuilder setOrCondition(String fieldName, String value) {
			List<String> arrayList = new ArrayList<>();
			arrayList.add(value);
			return setOrCondition(fieldName, arrayList);
		}
		
		public SQLQueryBuilder setOrCondition(String fieldName, List<String> values) {
			if(values == null) {
				return this;
			}
			int count = 1;
			setStartBrace();
			for (String value : values) {
				if (count == values.size()) {
					this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value));
				} else {
					this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value).concat(Key_OrCondition));
				}
				count++;
			}
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetOrCondition(String fieldName, List<String> values) {
			if(values == null || values.size() < 1) {
				return this;
			}
			int count = 1;
			setAndCondition();
			setStartBrace();
			for (String value : values) {
				if (count == values.size()) {
					this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value));
				} else {
					this.query = this.query.concat(fieldName.concat(Key_Equals).concat(value).concat(Key_OrCondition));
				}
				count++;
			}
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetLessThanCondition (String fieldName, Integer value) {
			if(value == null) {
				return this;
			}
			return andSetLessThanCondition(fieldName, value.toString());
		}
		
		public SQLQueryBuilder andSetLessThanCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_LesserThan).concat(value));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetLessThanCondition (String fieldName, Long value) {
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_LesserThan).concat(value.toString()));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetGreaterThanCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_GreaterThan).concat(value));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetGreaterThanCondition (String fieldName, Long value) {
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_GreaterThan).concat(value.toString()));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder setLimit(String value) {
			if (value != null) {
				if (this.query.contains(Key_LimitCondition.trim())) {
					return this;
				}
				this.query = query.concat(Key_LimitCondition.concat(value));
			}
			return this;
		}

		public SQLQueryBuilder setOffset(String value) {
			if (value != null) {
				if (this.query.contains(Key_OffsetCondition.trim())) {
					return this;
				}
				this.query = query.concat(Key_OffsetCondition.concat(value));
			}
			return this;
		}
		
		public SQLQueryBuilder setLikeCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			this.query = this.query.concat(fieldName.concat(Key_Like).concat(value));
			return this;
		}
		
		public SQLQueryBuilder setMultipleLikeCondition (String fieldName, List<String> value) {
			if (value == null) {
				return this;
			}
			for(int i=0; i< value.size(); i++){
				// skip first condition operator as previous line adds a and operator.
				if(i == 0) {
					this.setLikeCondition(fieldName, value.get(i));
					continue;
				}
				this.orSetLikeCondition(fieldName, value.get(i));
			};
			return this;
		}
		
		public SQLQueryBuilder andSetLikeCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_Like).concat(value));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder orSetLikeCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			setOrCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_Like).concat(value));
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetMultipleLikeCondition (String fieldName, List<String> value) {
			if (value == null) {
				return this;
			}
			setAndCondition();
			setStartBrace();
			for(int i=0; i< value.size(); i++){
				// skip first condition operator as previous line adds a and operator.
				if(i == 0) {
					this.setLikeCondition(fieldName, value.get(i));
					continue;
				}
				this.orSetLikeCondition(fieldName, value.get(i));
			};
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder orSetMultipleLikeCondition (String fieldName, List<String> value) {
			if (value == null) {
				return this;
			}
			setOrCondition();
			setStartBrace();
			value.parallelStream().forEach(val -> {
				this.orSetLikeCondition(fieldName, val);
			});
			setEndBrace();
			return this;
		}
		
		public SQLQueryBuilder andSetNotEqualCondition (String fieldName, String value) {
			if(value == null) {
				return this;
			}
			setAndCondition();
			setStartBrace();
			this.query = this.query.concat(fieldName.concat(Key_NotEqual).concat("\"").concat(value).concat("\""));
			setEndBrace();
			return this;
		}
 
	}
}
