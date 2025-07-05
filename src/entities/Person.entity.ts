import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index, OneToMany
} from 'typeorm';
import {Certificate} from "./certificate.entity";
import {AdditionalInformation} from "./additional-information.entity";
import {ContactInfo} from "./contact-info.entity";
import {Applicant} from "./applicant.entity";
import {Document} from "./document.entity";
import {Education} from "./education.entity";
import {Experience} from "./experience.entity";
import {LanguageInfo} from "./language-info.entity";
import {Properties} from "./properties.entity";
import {Property} from "./property.entity";
import {Skill} from "./skill.entity";

@Entity('tb_person')
@Index('ix_recruitment_tb_person_national_no', ['nationalNo'], { unique: true })
export class Person {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false, name: 'national_no' })
  nationalNo: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ type: 'date', nullable: false, name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'int', nullable: false, name: 'birth_place_id' })
  birthPlaceId: number;

  @Column({ type: 'int', nullable: true, name: 'location_place_id' })
  locationPlaceId: number;

  @Column({ type: 'int', nullable: false, name: 'sex_id' })
  sexId: number;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'about_me' })
  aboutMe: string;

  @Column({ type: 'varchar', length: 15, nullable: false, name: 'mobile_number' })
  mobileNumber: string;

  @Column({ type: 'varchar', length: 20, nullable: true, name: 'telephone_number' })
  telephoneNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true, name: 'email_address' })
  emailAddress: string;

  @Column({ type: 'varchar', length: 200, nullable: true, name: 'address' })
  address: string;

  @Column({ type: 'char', length: 10, nullable: true, name: 'post_code' })
  postCode: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'profile_image' })
  profileImage: string;

  @Column({ type: 'timestamp', nullable: false, name: 'created_date' })
  createdDate: Date;

  @OneToMany(() => Certificate,(certificates)=>certificates.person)
  certificates: Certificate[];

  @OneToMany(() => AdditionalInformation,(additionalInformations)=>additionalInformations.person)
  additionalInformations: AdditionalInformation[];

  @OneToMany(() => Applicant,(applicants)=>applicants.person)
  applicants: Applicant[];

  @OneToMany(() => ContactInfo,(contactInfos)=>contactInfos.person)
  contactInfos: ContactInfo[];

  @OneToMany(() => Document,(documents)=>documents.person)
  documents: Document[];

  @OneToMany(() => Education,(educations)=>educations.person)
  educations: Education[];

  @OneToMany(() => Experience,(experiences)=>experiences.person)
  experiences: Experience[];

  @OneToMany(() => LanguageInfo,(languageInfos)=>languageInfos.person)
  languageInfos: LanguageInfo[];

  @OneToMany(() => Properties,(properties)=>properties.person)
  properties: Properties[];

  @OneToMany(() => Property,(propertyRecords)=>propertyRecords.person)
  propertyRecords: Property[];

  @OneToMany(() => Skill,(skills)=>skills.person)
  skills: Skill[];
}