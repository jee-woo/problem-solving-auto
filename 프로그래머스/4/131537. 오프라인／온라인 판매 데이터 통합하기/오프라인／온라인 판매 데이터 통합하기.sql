SELECT
    DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE,
    PRODUCT_ID,
    USER_ID,            -- USER_ID는 오프라인 판매의 경우 NULL이 될 수 있습니다.
    SALES_AMOUNT
FROM
    ONLINE_SALE
WHERE
    DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-03' -- 1. 온라인 판매 기록 필터링
    
UNION ALL -- 2. 두 테이블을 수직으로 합칩니다

SELECT
    DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE,
    PRODUCT_ID,
    NULL AS USER_ID,    -- 오프라인 판매에는 USER_ID가 없으므로 NULL로 맞춥니다.
    SALES_AMOUNT
FROM
    OFFLINE_SALE
WHERE
    DATE_FORMAT(SALES_DATE, '%Y-%m') = '2022-03' -- 3. 오프라인 판매 기록 필터링
    
ORDER BY 
    SALES_DATE, 
    PRODUCT_ID, 
    USER_ID; -- 4. 결과 정렬

