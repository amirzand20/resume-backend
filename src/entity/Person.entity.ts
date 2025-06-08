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
@Index('ix_recruitment_tb_person_national_no', ['national_no'], { unique: true })
export class Person {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  national_no: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  last_name: string;

  @Column({ type: 'date', nullable: false })
  birth_date: Date;

  @Column({ type: 'int', nullable: false })
  birth_place_id: number;

  @Column({ type: 'int', nullable: true })
  location_place_id: number;

  @Column({ type: 'int', nullable: false })
  sex_id: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  aboaut_me: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  mobile_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telephone_number: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  email_address: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  address: string;

  @Column({ type: 'char', length: 10, nullable: true })
  post_code: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profile_image: string;

  @Column({ type: 'timestamp', nullable: false })
  created_date: Date;

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