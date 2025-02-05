package jn.sias.domain.flow;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlowFestInfoDto {

    private int id;
    private String title;
    private String startDate;
    private String endDate;
    private String yyyy;
    private String host;
    private String content;
    private double x_coord;
    private double y_coord;
    private String geom;

}
